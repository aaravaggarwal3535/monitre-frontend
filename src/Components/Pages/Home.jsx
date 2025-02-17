import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, PieChart, LineChart } from "lucide-react";

function Home() {
  const id = useSelector((state) => state.id.value);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <Link to={id ? "/dashboard" : "/login"}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden">
        <div className="text-black font-bold mt-10 text-center bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl shadow-sm">
          <motion.h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Take Control of Your Finances</motion.h2>
          <motion.h3 className="text-2xl md:text-3xl">Make Your <span className="text-[#04AD83] font-extrabold">Money</span> Tree Now!</motion.h3>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="bg-gradient-to-b from-gray-50 to-white mt-[50px] rounded-2xl shadow-xl mx-5 md:mx-auto max-w-4xl p-8 text-center">
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">Take control of your money like never before. With Monitre, managing your finances is simple, smart, and stress-free.</motion.p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer px-8 py-3 bg-[#04AD83] hover:bg-green-700 text-white rounded-lg text-lg font-semibold shadow-lg transition-all duration-300">Get Started</motion.button>
        </motion.div>

        <motion.div className="px-4 md:px-20 mt-20">
          <h2 className="font-bold text-4xl md:text-5xl mb-6 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Indian Market at Your Fingertips</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Long-term or short-term, high-risk or low-risk. Be the kind of investor you want to be.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mt-8 px-10 max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-col gap-6 md:w-1/2">
            {[{ title: "Stocks & Intraday", icon: TrendingUp }, { title: "Mutual Funds & SIP", icon: PieChart }, { title: "Futures & Options", icon: LineChart }].map((item, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex items-center p-6 bg-gradient-to-r from-green-400 to-green-500 rounded-xl shadow-lg text-white cursor-pointer transition-all duration-300">
                <item.icon className="w-8 h-8 mr-4" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="md:w-1/2 flex justify-center items-center">
            <img src="//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/stocksBuy.5382418f.webp" alt="Investment Platform" className="max-w-full h-[750px] object-contain rounded-2xl shadow-2xl" loading="lazy" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default Home;
