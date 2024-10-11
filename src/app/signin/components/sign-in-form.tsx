"use client";

import React from "react";
import InputForm from "@/app/components/input-form";
import ButtonForm from "@/app/components/button-form";

export default function LoginForm() {
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputForm
          placeholder="User"
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
            model="success"
            placeholder="Sign in"
            type="submit"
            handleOnClick={() => null}
          />
          <ButtonForm
            type="button"
            model="warning"
            placeholder="Sign up"
            handleOnClick={() => null}
          />
        </div>
      </form>
    </div>
  );
}
