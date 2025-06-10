'use client';
import { userStore } from "@/store/userStore";
import Box from "@mui/material/Box";

export const Users = () => {
    const name = userStore((state) => state.user.name);
    const setName = userStore((state) => state.setName);
  
    console.log("name comp re-rendered"); // ← user sees this
  
    return (
     
      <input
      placeholder="name"
        value={name }
        onChange={(e) => setName(e.target.value)}
      />
   
    );
  };