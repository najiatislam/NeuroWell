import React, { useState } from 'react';

const GlobalPharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [visiblePharmacies, setVisiblePharmacies] = useState(5); // Number of pharmacies to show initially

  const pharmacies = [
    {
      name: 'Canada Drugs Direct',
      description: 'Provides access to affordable medications, including antidepressants and antipsychotics, shipping to various countries.',
      link: 'https://www.canadadrugsdirect.com/',
    },
    {
      name: 'Johnson & Johnson (Janssen Pharmaceuticals)',
      description: 'A major player in neuroscience, J&J has expanded its mental health portfolio with drugs like Spravato (esketamine) for treatment-resistant depression.',
      link: 'https://www.lilly.com/',
    },
    {
      name: 'PlanetDrugsDirect',
      description: 'Offers a variety of prescription medications, including those for mental health, with international shipping options.',
      link: 'https://www.planetdrugsdirect.com/',
    },
    {
      name: 'Novartis AG',
      description: 'Produces Clozaril (clozapine) for schizophrenia and has a broad portfolio in neurological and psychiatric disorders.',
      link: 'https://www.novartis.com/',
    },
    {
      name: 'Health Mart',
      description: 'A network of independently owned pharmacies in the United States, offering personalized care.',
      link: 'https://www.healthmart.com/',
    },
    {
      name: 'Sun Pharmaceutical Industries Ltd.',
      description: 'Largest pharmaceutical company of India, offering a variety of psychiatric medications globally.',
      link: 'https://sunpharma.com/',
    },
    {
      name: 'PharmaDirect',
      description: 'An Australian online pharmacy offering a wide range of medicines and healthcare products.',
      link: 'https://www.pharmadirect.com.au/',
    },
    {
      name: 'Teva Pharmaceutical Industries Ltd.',
      description: 'A leading generic drug manufacturer, providing affordable mental health medications worldwide',
      link: 'https://www.tevapharm.com/',
    },
    {
        name: 'GlaxoSmithKline (GSK)',
        description: ' Offers a range of treatments for depression and anxiety disorders.',
        link: 'https://www.gsk.com/en-gb/',
      },
      {
        name: 'HealthWarehouse',
        description: 'A U.S.-based online pharmacy offering a wide range of prescription medications, including those for mental health.',
        link: 'https://www.canadadrugsdirect.com/',
      },
  ];

  const handleSearch = () => {
    const results = pharmacies.filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPharmacies(results);
  };

  const handleShowMore = () => {
    setVisiblePharmacies((prev) => prev + 5); // Show 5 more pharmacies when clicked
  };

  return (
    <div className='p-10'>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>GLOBAL<span className='text-gray-700 font-semibold'> PHARMACY</span></p>
      </div>

      <div className='my-10 text-gray-600'>
        <p>Access pharmacies worldwide for a wide range of medicines and healthcare products.</p>
      </div>

      {/* Search Bar */}
      <div className='my-6 flex justify-center'>
        <input
          type='text'
          placeholder='Search for a pharmacy...'
          className='border border-gray-400 p-2 rounded w-full md:w-1/2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className='ml-4 bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition-all'
        >
          Search
        </button>
      </div>

      {/* Pharmacy List */}
      <div className='mt-10'>
        {(filteredPharmacies.length > 0 ? filteredPharmacies : pharmacies.slice(0, visiblePharmacies)).map((pharmacy) => (
          <div key={pharmacy.name} className='mb-6 p-4 border border-gray-300 rounded bg-gray-100'>
            <h3 className='text-lg font-semibold text-gray-700'>{pharmacy.name}</h3>
            <p className='text-gray-600 mt-2'>{pharmacy.description}</p>
            <a
              href={pharmacy.link}
              className='text-teal-700 underline mt-4 inline-block'
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Pharmacy
            </a>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visiblePharmacies < pharmacies.length && (
        <div className='text-center mt-6'>
            <button
               onClick={handleShowMore}
            className='bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition-all'
     > 
            Show More
        </button>
      </div> 
  )}
    </div>
  );
};

export default GlobalPharmacy;