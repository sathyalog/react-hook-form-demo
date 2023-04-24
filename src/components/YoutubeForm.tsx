import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};
function YoutubeForm() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;
  renderCount++;
  const formSubmission = (data: FormValues) => {
    console.log("Form submission", data);
  };
  return (
    <div>
      <h1>YouTube Form({renderCount / 2})</h1>
      {/* renderCount / 2 is used here as react does 2 times render in dev mode */}
      <form onSubmit={handleSubmit(formSubmission)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
        <DevTool control={control} />
      </form>
    </div>
  );
}

export default YoutubeForm;
