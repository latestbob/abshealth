import { FaRunning, FaUserMd, FaHeartbeat, FaMedkit } from 'react-icons/fa'; // Icons from react-icons

const Services = () => {
  const services = [
    {
      icon: <FaRunning className="w-12 h-12 text-[#ff9017]" />,
      title: "Sports Injury Therapy",
      description:
        "Recover from sports-related injuries with personalized treatment plans designed to get you back in the game.",
    },
    {
      icon: <FaUserMd className="w-12 h-12 text-[#ff9017]" />,
      title: "Post-Surgery Rehabilitation",
      description:
        "Specialized care to help you regain strength and mobility after surgery.",
    },
    {
      icon: <FaHeartbeat className="w-12 h-12 text-[#ff9017]" />,
      title: "Chronic Pain Management",
      description:
        "Effective therapies to manage and reduce chronic pain, improving your quality of life.",
    },
    {
      icon: <FaMedkit className="w-12 h-12 text-[#ff9017]" />,
      title: "Preventive Care",
      description:
        "Proactive treatments to prevent injuries and maintain optimal physical health.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mini Title */}
        <p className="text-center text-[#1997cf] font-semibold uppercase tracking-wider">
          Our Services
        </p>
        {/* Main Title */}
        <h2 className="mt-2 text-3xl font-bold text-center text-gray-900">
          What We Offer
        </h2>
        {/* Services Grid */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-center max-w-xs transition-transform transform hover:scale-105"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full">
                {service.icon}
              </div>
              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              {/* Description */}
              <p className="mt-4 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;