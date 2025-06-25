"use client";

import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="contained" disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
        </Button>
    );
}