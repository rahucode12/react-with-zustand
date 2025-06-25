//this is to learn actions API in nextJS 14+

"use server";

export async function createUser(data: FormData) {

    const name = data.get("name") as string;


    if (!name || name.trim() === "") {
        throw new Error("Name required");
    }

    console.log("Creating user with name:", name);
}