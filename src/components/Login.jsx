import React, { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';
import { motion } from 'framer-motion';
import logo from '../images/io.png';

const Login = () => {
  const dispatch = useDispatch();
  const [clouds, setClouds] = useState([]);

  // Generate random clouds on mount
  useEffect(() => {
    const cloudArray = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: Math.random() * 70 + '%',
      duration: 40 + Math.random() * 20, // speed variation
      size: 50 + Math.random() * 100, // size variation
    }));
    setClouds(cloudArray);
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(
        setAuthUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200">

      {/* Animated Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: '-20vw' }}
          animate={{ x: '120vw' }}
          transition={{
            repeat: Infinity,
            duration: cloud.duration,
            ease: 'linear',
          }}
          className="absolute opacity-70"
          style={{
            top: cloud.top,
            width: cloud.size,
            height: cloud.size / 2,
          }}
        >
          <div className="w-full h-full bg-white rounded-full blur-md shadow-md"></div>
        </motion.div>
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl relative z-10"
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Sky Mail Logo"
          className="w-16 h-16 mb-4 animate-bounce"
        />
        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sky Mail</h1>
        {/* Description */}
        <p className="text-gray-600 text-center mb-4 text-sm">
          A modern, fast & secure email client to help you manage your inbox effortlessly.
        </p>
        {/* Google Login Button */}
        <GoogleButton onClick={signInWithGoogle} className="w-full" />
        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          © 2025 Sky Mail. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

