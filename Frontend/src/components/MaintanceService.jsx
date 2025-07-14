import React from 'react'
import ServiceForm from './ServiceForm';

const MaintanceService = () => {
return (
    <>
        <div className="bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
                    <img
                src="/carrepaier.avif"
                alt="Service Cars"
                className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-sm font-bold tracking-widest text-black mb-4">SERVICE</h2>
                    <p className="text-gray-700 leading-relaxed text-justify opacity-90">
             Our expert team brings over a decade of hands-on experience working with high-end and performance vehicles.
             We never experiment on customer cars—instead, we apply the skills we've developed through work at official
            dealerships, motorsport teams, and top-tier tuning centers. At VENOM, we offer a comprehensive suite of
            services: from assessing your car’s condition and running in-depth diagnostics, to inspecting every component
            and system, changing fluids, and repairing or replacing faulty parts. Cars are more than machines to us—they're
            our passion. When you trust your vehicle to VENOM, you can rest assured it's in capable and caring hands.
     </p>
     </div>
     </div>
        </div>
        <ServiceForm />
    </>
);
}

export default MaintanceService