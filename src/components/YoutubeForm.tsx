import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
function YoutubeForm() {
  const form = useForm();
  const { register, control } = form;
  renderCount++;
  return (
    <div>
      <h1>YouTube Form({renderCount / 2})</h1>
      {/* renderCount / 2 is used here as react does 2 times render in dev mode */}
      <form>
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
