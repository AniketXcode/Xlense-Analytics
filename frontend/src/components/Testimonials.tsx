import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aniket",
      role: "Frontend Developer",
      content:
        "Xlense Analytics has revolutionized how we present data to stakeholders. The 3D charts are absolutely stunning!",
      rating: 5,
      avatar: "A",
      color: "#A855F7",
    },
    {
      name: "Ankush Kumar",
      role: "Backend Developer",
      content:
        "I used to spend hours creating charts manually. Now I can generate beautiful visualizations in minutes.",
      rating: 5,
      avatar: "AK",
      color: "#3B82F6",
    },
    {
      name: "Aaryan Kamdar",
      role: "Database Manager",
      content:
        "The ease of use is incredible. My team loves how quickly we can turn spreadsheets into compelling presentations.",
      rating: 5,
      avatar: "AK",
      color: "#06B6D4",
    },
    {
      name: "Shruti Vishwakarma",
      role: "Frontend Developer",
      content:
        "This platform is a game-changer! The insights I can pull from simple Excel sheets are beyond impressive.",
      rating: 5,
      avatar: "SV",
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden bg-[#030014]"
    >
      {/* Background gradient glows */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Animated Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text mb-4">
            What People Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Here’s what our users think about their journey with{" "}
            <span className="text-purple-400 font-semibold">
              Xlense Analytics
            </span>
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all duration-500 hover:scale-[1.04] h-full">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 mr-1"
                          style={{ color: t.color }}
                          fill={t.color}
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-300 leading-relaxed italic mb-6">
                      “{t.content}”
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white mr-4"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
