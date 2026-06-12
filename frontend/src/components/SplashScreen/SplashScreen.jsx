import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './SplashScreen.css';
// Make sure the image paths are correct for your project structure
import kceCampusBg from '../../assets/kce-campus-bg.jpg'; 
import kceLogo from '../../assets/kce-logo-2.png';
import appLogo from '../../assets/app-logo-1.png'; 
import Loader from './Loader';

const SplashScreen = () => {
  return (
    <div 
      className="splash-screen"
      style={{ backgroundImage: `url(${kceCampusBg})` }}
    >
      <div className="fog-overlay"></div>
      
      <motion.div 
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.5 } }} // Slower overall fade-in
      >
        <motion.img
          src={kceLogo}
          alt="Karpagam College of Engineering Logo"
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1.5, ease: "easeOut" } }}
        />
        <motion.img
          src={appLogo}
          alt="KCE Leave Portal Logo"
          className="app-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.7, duration: 1.5 } }}
        />
        
        <div className="loader-group">
          <Loader />
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;