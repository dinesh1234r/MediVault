import React, { useEffect, useRef, useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, Button, IconButton, Text } from "@chakra-ui/react";
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash } from "react-icons/fa";
import { Peer } from "peerjs";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const VideoCall = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [peer, setPeer] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [calling, setCalling] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localStreamRef.current = stream;
          localVideoRef.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
          call.on("close", () => {
            remoteVideoRef.current.srcObject = null;
          });
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
          alert("Failed to access camera/microphone. Please check your permissions.");
        });
    });

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const callPeer = (remoteId) => {
    if (calling || !remoteId) return;

    setCalling(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
        const call = peer.call(remoteId, stream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
        call.on("close", () => {
          remoteVideoRef.current.srcObject = null;
          setCalling(false);
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        alert("Failed to access camera/microphone. Please check your permissions.");
        setCalling(false);
      });
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(!isVideoOn);
    }
  };

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
      remoteVideoRef.current.srcObject = null;
      setCalling(false)
    }
  };

  return (
    <ChakraProvider>
      <Box w="100vw" h="100vh" color="white" display="flex" flexDirection="column" alignItems="center">
        {/* Video Section */}
        <HStack w="80%" h="70%" spacing={4} justify="center">
          <Box flex="1" bg="black" position="relative" borderRadius="lg" overflow="hidden">
            <video ref={localVideoRef} autoPlay playsInline style={{ width: "100%", height: "100%" }}></video>
            <Box position="absolute" bottom="2" left="2" bg="blackAlpha.600" p={2} borderRadius="md" fontSize="sm">
              You
            </Box>
          </Box>
          <Box flex="1" bg="black" position="relative" borderRadius="lg" overflow="hidden">
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "100%", height: "100%" }}></video>
            <Box position="absolute" bottom="2" left="2" bg="blackAlpha.600" p={2} borderRadius="md" fontSize="sm">
              Remote User
            </Box>
          </Box>
        </HStack>
        {/* Input and Call Button */}
        <VStack spacing={3} mb={4}>
          <HStack>
            <Input
              placeholder="Enter remote peer ID"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
              bg="gray.700"
              color="white"
              border="none"
              _placeholder={{ color: "gray.400" }}
            />
            <Button colorScheme="blue" onClick={() => callPeer(remotePeerId)} isDisabled={calling}>
              Call
            </Button>
          </HStack>
        </VStack>
        {/* Control Buttons */}
        <HStack position="absolute" bottom="4" bg="teal" p={4} borderRadius="md" spacing={4}>
          <IconButton icon={isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />} onClick={toggleMute} aria-label="Mute" colorScheme="gray" />
          <IconButton icon={isVideoOn ? <FaVideo /> : <FaVideoSlash />} onClick={toggleVideo} aria-label="Toggle Video" colorScheme="gray" />
          <IconButton icon={<FaPhone />} onClick={endCall} aria-label="End Call" colorScheme="red" />
          <IconButton icon={<FiHome />} onClick={()=>navigate('/history')} aria-label="Home Navigate" colorScheme="red" />
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default VideoCall;