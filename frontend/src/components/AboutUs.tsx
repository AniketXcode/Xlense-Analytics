import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const values = [
    {
      icon: Users,
      title: "User-Centric",
      description:
        "We design every feature with our users in mind, making data visualization accessible to everyone.",
      color: "#A855F7",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to bring you the latest in data visualization technology.",
      color: "#3B82F6",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality tools and exceptional user experience.",
      color: "#06B6D4",
    },
    {
      icon: Lightbulb,
      title: "Simplicity",
      description:
        "Complex data visualization made simple — that’s our core philosophy.",
      color: "#8B5CF6",
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#030014]">
      {/* Neon gradient background blur */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            About Xlense Analytics
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Empowering people to transform their spreadsheet data into
            meaningful visual stories with simplicity, power, and beauty.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-white mb-4">
              Making Data Beautiful and Accessible
            </h3>
            <p className="text-gray-400 mb-4">
              Xlense Analytics bridges the gap between complex data and clear
              insights. Whether you're a data analyst or a beginner, our tools
              help you visualize information effortlessly.
            </p>
            <p className="text-gray-400">
              Join 10,000+ creators who have built over 5,000 visualizations
              using our platform, with 99.9% uptime and 24/7 support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <div className="grid grid-cols-2 gap-8 text-center">
              {[
                ["10K+", "Visualizations Rendered", "#A855F7"],
                ["5K+", "Charts Built", "#06B6D4"],
                ["99.9%", "Uptime", "#3B82F6"],
                ["24/7", "Support", "#8B5CF6"],
              ].map(([stat, label, color], i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="text-4xl font-extrabold mb-2"
                    style={{ color }}
                  >
                    {stat}
                  </div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:scale-[1.05]">
                  <CardContent>
                    <div
                      className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-xl"
                      style={{ backgroundColor: value.color }}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
