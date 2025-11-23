import React, { useRef, useState, useEffect } from 'react';
import { Box, Divider, IconButton, Slider, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        [...document.getElementsByTagName('audio')].forEach(element => {
          element.pause();
        }); 
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newValue;
      setVolume(newValue);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={style => ({
        paddingX: 2,
        paddingY: 1,
        border: '1px solid',
        borderColor: style.palette.divider,
        borderRadius: style.shape.borderRadius,
        backgroundColor: style.palette.background.paper,
        maxWidth: 900 })}>
      <audio ref={audioRef} src={src} />
      <Stack>
        <Box color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
            value={currentTime}
            max={duration}
            onChange={(e, val) => {
              if (audioRef.current) audioRef.current.currentTime = val;
            }}
            aria-labelledby="progress-slider"
          />
        </Box>
        <Box color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>{formatTime(currentTime)} / {formatTime(duration)}</Typography>
          <Divider sx={{ flexGrow: 1 }} />
          <IconButton onClick={ev => handleVolumeChange(ev, volume === 0 ? 0.5 : 0)}>
            {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            sx={{ maxWidth: 80 }}
          />
        </Box>
      </Stack>
    </Box>
  );
}