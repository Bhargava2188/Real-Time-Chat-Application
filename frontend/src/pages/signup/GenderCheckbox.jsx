import React from 'react'

const GenderCheckbox = () => {
  return (
    <div className='flex gap-6 mt-2'>

      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
          <span className='label-text text-black'>Male</span>

          <input
            type='checkbox'
            className='checkbox border-2 border-black w-5 h-5'
          />
        </label>
      </div>

      <div className='form-control'>
        <label className='label gap-2 cursor-pointer'>
          <span className='label-text text-black'>Female</span>

          <input
            type='checkbox'
            className='checkbox border-2 border-black w-5 h-5'
          />
        </label>
      </div>

    </div>
  );
};

export default GenderCheckbox;


//start code
// import React from 'react'

// const GenderCheckbox = () => {
//   return (
//     <div className='flex gap-6 mt-2'>

//       <div className='form-control'>
//         <label className='label gap-2 cursor-pointer'>
//           <span className='label-text text-black'>Male</span>

//           <input
//             type='checkbox'
//             className='checkbox border-2 border-black w-5 h-5'
//           />
//         </label>
//       </div>

//       <div className='form-control'>
//         <label className='label gap-2 cursor-pointer'>
//           <span className='label-text text-black'>Female</span>

//           <input
//             type='checkbox'
//             className='checkbox border-2 border-black w-5 h-5'
//           />
//         </label>
//       </div>

//     </div>
//   );
// };

// export default GenderCheckbox;