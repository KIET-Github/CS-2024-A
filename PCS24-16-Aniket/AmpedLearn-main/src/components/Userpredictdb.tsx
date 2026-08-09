
import React from 'react';
import Graph from './Graph';

const Userpredictdb=()=> {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8 md:py-12">
      <div className="bg-teal-400  shadow-md rounded-2xl p-6">
        <h3 className="text-4xl font-bold text-teal-600 mb-6">
          What our users already know...
        </h3>
        <Graph language="language" />
      </div>
      <div className="bg-teal-600 shadow-md rounded-2xl p-6">
        <h3 className="text-4xl font-bold text-teal-400 mb-6">
          What our users want to learn...
        </h3>
<Graph language="future" />
      </div>
    </div>
  );
}

export default Userpredictdb;
