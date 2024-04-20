import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion dari 'framer-motion'
import {  Item, Tag } from './DataType';

interface Props {
  items: Item[];
}

const Gallery: React.FC<Props> = ({ items }) => {
  const [filterRating, setFilterRating] = React.useState<string | null>(null);

  const filteredItems = filterRating
    ? items.filter(item => item.rating === filterRating)
    : items;

  return (
<div className=" p-4">
  <div className="flex flex-wrap justify-center space-x-4 mb-4">
    <motion.button
      whileHover={{ scale: 1.1 }}
      className={`px-4 py-2 rounded-full ${filterRating === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={() => setFilterRating(null)}
    >
      All
    </motion.button>
    {['safe', 'explicit', 'suggestive', 'borderline'].map(rating => (
      <motion.button
        key={rating}
        whileHover={{ scale: 1.1 }}
        className={`px-4 py-2 rounded-full ${filterRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setFilterRating(rating)}
      >
        {rating}
      </motion.button>
    ))}
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {filteredItems.map((item) => (
      <motion.div
        key={item.id}
        whileHover={{ scale: 1.05 }}
        className="rounded overflow-hidden shadow-lg border border-gray-300 transition duration-300"
      >
        <a href={item.sample_url} target="_blank" rel="noopener noreferrer">
          <img className="w-full h-48 object-cover" src={item.image_url} alt="Gallery" />
        </a>
        <div className="px-4 py-2">
          <Link to={`rating/${item.rating}`}>
            <motion.div
              whileHover={{ scale: 1.1 }} // Efek hover pada rating
              className="font-bold text-base mb-1"
            >
              {item.rating}
            </motion.div>
          </Link>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag: Tag) => (
              <Link key={tag.id} to={`tag/${tag.id}`}>
                <button className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="button">
                  {tag.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
  );
};

export default Gallery;
