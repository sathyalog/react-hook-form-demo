import { useForm } from "react-hook-form";
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
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  renderCount++;
  const formSubmission = (data: FormValues) => {
    console.log("Form submission", data);
  };
  return (
    <div className="form-control">
      <h1>YouTube Form({renderCount / 2})</h1>
      {/* renderCount / 2 is used here as react does 2 times render in dev mode */}
      <form onSubmit={handleSubmit(formSubmission)} noValidate>
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
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="Twitter ID"
            {...register("social.twitter")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            placeholder="facebook"
            {...register("social.facebook")}
          />
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YoutubeForm;
