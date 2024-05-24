import {default as api} from '../store/apiSlice';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  name: string;
  feed: string;
  language: string;
  future: string;
}

function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [addFeedback]=api.useAddFeedbackMutation();

  const onSubmit = async(data: FormData) => {
    // Additional validation for "Name" and "Feedback" fields
    if (!/^[a-zA-Z\s]*$/.test(data.name)) {
      alert('Name can only contain letters and spaces.');
    } else if (!/^[a-zA-Z\s]*$/.test(data.feed)) {
      alert('Feedback can only contain letters and spaces.');
    } else {
      if(!data)
        return{};
        await addFeedback(data).unwrap();
      console.log(data);
    }
  };

  return (
    <div className="flex flex-col w-full py-10 border-2 px-5">
      <h1 className="text-5xl font-bold">Feedback Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="w-full flex flex-col py-3">
          <label className="text-3xl">Name</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: 'Name can only contain letters and spaces.',
              },
            }}
            render={({ field }) => (
              <>
                <input {...field} className="border-2 border-black text-black pl-3" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </>
            )}
          />
        </div>
        <div className="w-full flex flex-col py-3">
          <label className="text-3xl">Feedback</label>
          <Controller
            name="feed"
            control={control}
            rules={{
              required: 'Feedback is required',
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: 'Feedback can only contain letters and spaces.',
              },
            }}
            render={({ field }) => (
              <>
                <input {...field} className="border-2 border-black text-black pl-3" />
                {errors.feed && <p className="text-red-500">{errors.feed.message}</p>}
              </>
            )}
          />
        </div>

        <div className="w-full flex flex-col py-3">
          <label className="text-3xl block mb-2 font-medium text-gray-900 dark:text-white py-3">
            Select current programming language
          </label>
          <Controller
            name="language"
            control={control}
            rules={{
              required: 'Please select a programming language',
            }}
            render={({ field }) => (
              <select
                {...field}
                className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="text-xl">
                  -- Select Language --
                </option>
                {/* Add other language options */}
                <option className="text-xl">
                C++
              </option>
              <option value="JAVA" className="text-xl">
                JAVA
              </option>
              <option value="PYTHON" className="text-xl">
                PYTHON
              </option>
              <option value="C" className="text-xl">
                C
              </option>
              <option value="REACT" className="text-xl">
                REACT
              </option>
              <option value="JAVASCRIPT" className="text-xl">
                JAVASCRIPT
              </option>
              <option value="NODE.JS" className="text-xl">
                NODE.JS
              </option>
              <option value="RUBY" className="text-xl">
                RUBY
              </option>
              </select>
            )}
          />
          {errors.language && <p className="text-red-500">{errors.language.message}</p>}
        </div>


        <div className="w-full flex flex-col py-3">
          <label className="text-3xl block mb-2 font-medium text-gray-900 dark:text-white py-3">
          Select Programming Laguage you were looking for
          </label>
          <Controller
            name="future"
            control={control}
            rules={{
              required: 'Please select a programming language',
            }}
            render={({ field }) => (
              <select
                {...field}
                className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="text-xl">
                  -- Select Language --
                </option>
                {/* Add other language options */}
                <option className="text-xl">
                C++
              </option>
              <option value="JAVA" className="text-xl">
                JAVA
              </option>
              <option value="PYTHON" className="text-xl">
                PYTHON
              </option>
              <option value="C" className="text-xl">
                C
              </option>
              <option value="REACT" className="text-xl">
                REACT
              </option>
              <option value="JAVASCRIPT" className="text-xl">
                JAVASCRIPT
              </option>
              <option value="NODE.JS" className="text-xl">
                NODE.JS
              </option>
              <option value="RUBY" className="text-xl">
                RUBY
              </option>
              </select>
            )}
          />
          {errors.language && <p className="text-red-500">{errors.language.message}</p>}
        </div>
        {/* Add validation for the "future" dropdown in a similar manner. */}
        
        <button type="submit" className="text-2xl font-bold bg-black mt-8 rounded-xl py-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;

