"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

interface formData {
  username?: string;
  emailAddress: string;
  password: string;
  confirmPassword?: string;
}

export async function signInOAuth(provider: any) {
  const supabase = await createSupabaseServerClient();
  const header = await headers();
  const origin = header.get("origin");
  const {error, data} = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
    },
  });
  if (!error) {
    redirect(data.url);
  } else {
    console.log(error);
    return JSON.stringify({error: "something went wrong!"});
  }
}

export async function signUpEmail(data: formData) {
  const supabase = await createSupabaseServerClient();

  if (data.password === data.confirmPassword) {
    const header = await headers();
    const origin = header.get("origin");

    const result = await supabase.auth.signUp({
      email: data.emailAddress,
      password: data.password,
      options: {
        data: {
          name: data.username,
          email: data.emailAddress,
          avatar_url: null,
        },
        emailRedirectTo: `${process.env.SITE_URL}/auth/callback`,
      },
    });

    if (result.data.user?.identities?.length == 0) {
      return JSON.stringify({error: "email already exist! try to sign in"});
    } else if (result.error) {
      return JSON.stringify({
        error: "Somethin went wrong! Please try again in a moment",
      });
    } else {
      return JSON.stringify({error: null});
    }
  } else {
    return JSON.stringify({error: "Password do not match"});
  }
}

export async function signInWithEmail(data: formData) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.emailAddress,
    password: data.password,
  });
  if (result.error?.message == "Invalid login credentials") {
    return JSON.stringify({
      error: "Invalid Email or Password! Please check your credentials",
    });
  } else if (result.error?.message) {
    return JSON.stringify({
      error: "Something ent wrong! Please try again in a moment",
    });
  } else {
    // return redirect("/dashboard");
    return JSON.stringify({error: null});
  }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.auth.signOut();
  redirect(`${process.env.SITE_URL!}`);
}

export async function sendPasswordReset(email: string) {
  const supabase = await createSupabaseServerClient();

  // TODO
  // check if email exists

  const header = await headers();
  const origin = header.get("origin");
  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.SITE_URL}/update-password`,
  });

  return JSON.stringify(error);
}

export async function resetPassword(password: string, code: string) {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return JSON.stringify({
      error: "The reset Link has expired!",
    });
  }
  const {error: error2} = await supabase.auth.updateUser({
    password: password,
  });

  if (error2) {
    return JSON.stringify({
      error: "Could not Update the Password! try again later",
    });
  }
  const header = await headers();
  const origin = header.get("origin");
  redirect(`${process.env.SITE_URL}/`);
  return JSON.stringify({error: null});
}

export const updatePassword = async (password: any) => {
  if (password.newPassword == password.confirmPassword) {
    if (password.newPassword.length >= 6 && password.newPassword.length <= 30) {
      const supabase = await createSupabaseServerClient();
      const current_plain_password = password.password;
      const new_plain_password = password.newPassword;
      const {error, data} = await supabase.rpc("change_user_password", {
        current_plain_password,
        new_plain_password,
      });

      if (!error && data == "success") {
        return JSON.stringify({
          success: "Password has been updated succsessfully",
        });
      }
      if (!error && data == "incorrect") {
        return JSON.stringify({
          error: "incorrect password",
        });
      }
      console.log(error);
      return JSON.stringify({
        error: "Something went wrong!",
      });
    } else {
      return JSON.stringify({
        error: "Password must be between 6 and 30 characters",
      });
    }
  } else {
    return JSON.stringify({error: "Password do not match"});
  }
  // return JSON.stringify({error: "Password do not match"});
};
