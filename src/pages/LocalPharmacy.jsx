import React, { useState } from 'react';

const LocalPharmacy = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [pharmacyDescription, setPharmacyDescription] = useState('');
  const [pharmacyLink, setPharmacyLink] = useState('');

  const pharmacies = {
    Bangladesh: [
      { name: 'Apon Health', description: 'Provides up to 10% discount and cashback on regular medicine purchases.', link: 'https://www.aponhealth.com/' },
      { name: 'Oshudh.com', description: 'Specializes in affordable mental health medications.', link: 'https://oshudh.com/' },
      { name: 'Medecine Wala', description: 'Offers home delivery services throughout Bangladesh.', link: 'https://medecinewala.com/' },
      { name: 'eEssentials', description: 'Provides a platform for purchasing various healthcare essentials .', link: 'https://eessentials.com.bd/' },
    ],
    India: [
      { name: 'PharmEasy', description: 'Delivery services in over 1,000 cities in India.', link: 'https://pharmeasy.in/' },
      { name: 'MrMed', description: 'Offers a range of products for conditions like schizophrenia, bipolar disorder, anxiety, and depression.', link: 'https://www.mrmed.in/condition/mental-wellness' },
      { name: 'Flipkart Health+', description: 'An e-commerce platform dealing in healthcare, online pharmacy, diagnostics, and e-consultation services in India.', link: 'https://healthplus.flipkart.com/' },
      { name: 'Psychocare Health Pvt. Ltd.', description: 'Specializes in neuropsychiatric drug ranges, offering over 900 products catering to various mental health conditions.', link: 'https://www.psychocare.co.in/' },
    ],
    Thailand: [
      { name: 'ThaiChemist', description: 'Provides a comprehensive range of medications for various mental health conditions, including depression, anxiety, bipolar disorder, and psychosis.', link: 'https://thaichemist.com/category/mental-health' },
      { name: 'Medisafe Pharma', description: 'Provides swift medicine delivery across Thailand, with expedited delivery in Bangkok (1 to 3 hours between 8:00 AM to 10:00 PM).', link: 'https://medisafepharma.com/' },
      { name: 'Health Deliver Asia', description: 'Provides a comprehensive selection of medications for various health conditions, including mental health.', link: 'https://www.healthdeliver.asia/pharmacy' },
    ],
  };

  const handlePharmacyChange = (event) => {
    const selected = event.target.value;
    setSelectedPharmacy(selected);

    // Find the description and link of the selected pharmacy
    for (const country in pharmacies) {
      const pharmacy = pharmacies[country].find((p) => p.name === selected);
      if (pharmacy) {
        setPharmacyDescription(pharmacy.description);
        setPharmacyLink(pharmacy.link);
        break;
      }
    }
  };

  return (
    <div className='p-10'>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>LOCAL<span className='text-gray-700 font-semibold'> PHARMACY</span></p>
      </div>

      <div className='my-10 text-gray-600'>
        <p>Select your country and a pharmacy to learn more about their mental health medicine services.</p>
      </div>

      <div className='flex flex-col gap-8'>
        {/* Dropdown for Bangladesh */}
        <div>
          <p className='font-semibold text-lg text-gray-700'>Bangladesh</p>
          <select
            className='border border-gray-400 p-2 rounded w-full md:w-1/2'
            onChange={handlePharmacyChange}
          >
            <option value="">Select a Pharmacy</option>
            {pharmacies.Bangladesh.map((pharmacy) => (
              <option key={pharmacy.name} value={pharmacy.name}>
                {pharmacy.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for India */}
        <div>
          <p className='font-semibold text-lg text-gray-700'>India</p>
          <select
            className='border border-gray-400 p-2 rounded w-full md:w-1/2'
            onChange={handlePharmacyChange}
          >
            <option value="">Select a Pharmacy</option>
            {pharmacies.India.map((pharmacy) => (
              <option key={pharmacy.name} value={pharmacy.name}>
                {pharmacy.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for Thailand */}
        <div>
          <p className='font-semibold text-lg text-gray-700'>Thailand</p>
          <select
            className='border border-gray-400 p-2 rounded w-full md:w-1/2'
            onChange={handlePharmacyChange}
          >
            <option value="">Select a Pharmacy</option>
            {pharmacies.Thailand.map((pharmacy) => (
              <option key={pharmacy.name} value={pharmacy.name}>
                {pharmacy.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selected pharmacy description */}
      {selectedPharmacy && (
        <div className='mt-10 p-4 border border-gray-300 rounded bg-gray-100'>
          <h3 className='text-lg font-semibold text-gray-700'>Selected Pharmacy: {selectedPharmacy}</h3>
          <p className='text-gray-600 mt-2'>{pharmacyDescription}</p>
          <a
            href={pharmacyLink}
            className='text-teal-700 underline mt-4 inline-block'
            target='_blank'
            rel='noopener noreferrer'
          >
            Go to Pharmacy Buying Page
          </a>
        </div>
      )}
    </div>
  );
};

export default LocalPharmacy;