import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  BarChart3,
  Layers3,
  Download,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description:
      "Simply drag and drop your Excel files or browse to upload. Supports .xlsx, .xls, and .csv formats.",
    color: "#1D4ED8",
  },
  {
    icon: BarChart3,
    title: "2D Visualizations",
    description:
      "Create stunning bar charts, line graphs, pie charts, and scatter plots with just a few clicks.",
    color: "#0EA5E9",
  },
  {
    icon: Layers3,
    title: "3D Charts",
    description:
      "Transform your data into immersive 3D visualizations for deeper insights and presentations.",
    color: "#7015e6ff",
  },
  {
    icon: Download,
    title: "Export Options",
    description:
      "Download your charts in PNG, PDF, SVG, or PowerPoint format — share visuals effortlessly.",
    color: "#6366F1",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data stays yours. We use encryption and temporary storage to ensure complete privacy.",
    color: "#334155",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Generate charts in seconds, even with massive Excel sheets — speed meets simplicity.",
    color: "#7010ffff",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-24 bg-gradient-to-b from-white via-[#f9f7ff] to-[#ede9fe] dark:from-[#0b0015] dark:via-[#0e0020] dark:to-[#15002b] overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-20 w-72 h-72 rounded-full bg-[#9C4EFF]/30 blur-[100px]"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#6A1BFF]/20 blur-[120px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5">
            Explore Our{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C4EFF] to-[#6A1BFF]"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Powerful Features
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock smarter, faster, and more beautiful ways to visualize your
            data — from raw sheets to stunning insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              viewport={{ once: true }}
            >
              <Card
                className="relative bg-white/80 dark:bg-[#1b012f]/50 backdrop-blur-xl 
                border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-500 overflow-hidden"
              >
                <CardContent className="p-8 flex flex-col justify-start">
                  {/* Icon with Glow */}
                  <div
                    className="relative w-14 h-14 mb-6 flex items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: feature.color,
                      boxShadow: `0 0 20px ${feature.color}66`,
                    }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>

                {/* Hover Glow Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  whileHover={{
                    borderColor: feature.color,
                    boxShadow: `0 0 25px ${feature.color}55`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
