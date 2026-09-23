import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Our Story</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          VogueStore was founded in 2024 with a simple mission: to bring high-quality, sustainable, and aesthetically pleasing products to people who care about craftsmanship.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality First</h3>
            <p className="text-gray-600">We partner with artisans and manufacturers who share our commitment to excellence. Every product in our store is hand-selected and rigorously tested.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
            <p className="text-gray-600">We believe in conscious consumption. That's why we prioritize eco-friendly materials and ethical production processes in everything we do.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
