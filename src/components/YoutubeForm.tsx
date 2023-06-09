import { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  };
  age: number;
  dob: Date;
};
function YoutubeForm() {
  const form = useForm<FormValues>({
    /* one way of dealing with 
    defaultValues: {
      username: "sathya",
      email: "sathya@gmail.com",
      channel: "channels",
    },*/
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: data.website,
        social: {
          twitter: "@sathya",
          facebook: "sathya",
        },
        phoneNumbers: ["", ""],
        phNumbers: [
          {
            number: "",
          },
        ],
        age: 0,
        dob: new Date(),
      };
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  renderCount++;

  const formSubmission = (data: FormValues) => {
    console.log("Form submission", data);
  };

  const handleGetValues = () => {
    console.log("get values", getValues()); // getValues("username") or getValues(["username","email"]) also works
  };

  const handleSetValue = () => {
    setValue("username", "sathya", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onError = (err: FieldErrors<FormValues>) => {
    console.log("form error", err);
  };

  /* we can also reset form values on form submission */
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  /* const watchUsername = watch(["username", "email"]); // watch("username") also works
  const watchForm = watch();
  console.log(watchUsername);*/

  /*If you want to perform side affect after watching value then use useEffect and watch callback*/
  /*useEffect(() => {
    const subscription = watch((value) => {
      console.log(value); // this console logs every time you type but renders happens once for each field
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  */

  return (
    <div className="form-control">
      <h1>YouTube Form({renderCount / 2})</h1>
      {/* <h3>Watched values: {watchUsername}</h3>
      <h4>Watch form: {JSON.stringify(watchForm)}</h4> */}
      {/* renderCount / 2 is used here as react does 2 times render in dev mode */}
      <form onSubmit={handleSubmit(formSubmission, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="Twitter ID"
            {...register("social.twitter", {
              required: "Twitter is required",
              disabled: watch("username") === "sathya", // once username is set to sathya then twitter disables automatically
              // disabled: true,
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            placeholder="facebook"
            {...register("social.facebook", {
              required: "Facebook is required",
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">primary-phone</label>
          <input
            type="text"
            id="primary-phone"
            placeholder="primary-phone"
            {...register("phoneNumbers.0", {
              required: "Primary phone is required",
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">secondary-phone</label>
          <input
            type="text"
            id="secondary-phone"
            placeholder="secondary-phone"
            {...register("phoneNumbers.1", {
              required: "Secondary phone is required",
            })}
          />
        </div>
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Username
        </button>
        <br />
        {/* Disable submit button if form is untouched or any errors in form or while form submission*/}
        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        {/* reset will only reset user entered values but not default values */}
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YoutubeForm;
