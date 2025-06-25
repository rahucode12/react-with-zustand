import SubmitButton from "@/app/_component/Forms/SubmitButton";
import { createUser } from "@/app/actions";
import { Box, Button } from "@mui/material";



export default async function CreatePostPage() {

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} marginTop={10}>
            <form action={createUser}>
                <h1>Create a New Post</h1>
                <input
                    name="name"
                    type="text"
                    placeholder="Title"
                    required
                    style={{ display: 'block', marginBottom: 10, width: '100%' }}
                />


                <SubmitButton />

            </form>

        </Box>
    )

}