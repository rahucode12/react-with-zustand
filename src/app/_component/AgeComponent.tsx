'use client';
import { userStore } from "@/store/userStore";
import Box from "@mui/material/Box";

export const AgeComponent = () => {
    const age = userStore((state) => state.user.age);
    const setAge = userStore((state) => state.setAge);
  
    console.log("age comp re-rendered"); // ← user sees this
  
    return (
     
      <input
      placeholder="age"
        value={age  }
        onChange={(e) => setAge(e.target.value)}
      />

    );
  };