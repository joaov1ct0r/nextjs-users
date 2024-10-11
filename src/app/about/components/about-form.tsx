"use client";

import React from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";

export default function AboutForm() {
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          placeholder="Name"
          id="name"
          type="text"
          handleOnChange={() => null}
          name="name"
        />
        <InputForm
          placeholder="Email"
          id="email"
          type="email"
          handleOnChange={() => null}
          name="email"
        />
        <InputForm
          placeholder="Username"
          id="username"
          type="text"
          handleOnChange={() => null}
          name="username"
        />
        <InputForm
          placeholder="Password"
          id="password"
          type="password"
          handleOnChange={() => null}
          name="password"
        />

        <div className="flex items-center justify-between">
          <ButtonForm
            type="submit"
            model="success"
            placeholder="Update"
            handleOnClick={() => null}
          />
        </div>
      </form>
    </div>
  );
}
