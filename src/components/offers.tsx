// components/Navbar.js
import Link from 'next/link';

const Offers = () => {
  return (
       <div className='w-full bg-[#1997cf] h-32 flex justify-center items-center space-x-8'>



            <div className="w-1/4 py-3  border-1 border-white rounded-xl">
                <p className="text-white font-medium text-center">50% off on Manual Therapy</p>
            </div>

            <div className="w-1/4 py-3  border-1 border-white rounded-xl">
                <p className="text-white font-medium text-center">FREE Posture & Assessment!</p>
            </div>

            <div className="w-1/4 py-3  border-1 border-white rounded-xl">
                <p className="text-white font-medium text-center">Free Knee Pain Consultation</p>
            </div>
            

       </div>
  );
};

export default Offers;