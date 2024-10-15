"use client"

import useAuthed from "@/components/context/hooks/useAuthed";
import useLogin from "@/components/context/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from './style/Auth.module.css';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
export default function AuthContainer() {

    const [token, setToken] = useState<string>('')

    const {login, isLoading, error, errors} = useLogin(token)

    const {authed, isLoading: isLoadingAuthed, error: errorAuthed, errors: errorsAuthed} = useAuthed()
useEffect(() => {
    authed()
}, [])
    return (
        <div className="container">
            <div className="form-container bg-slate-200 dark:bg-background p-7 rounded-2xl mt-60 flex items-center flex-col">
                <div className={`${styles.authContainer} form-title mb-3 bg-card flex items-center justify-center rounded-2xl border`}>
                    <p className={`${styles.textAuth} text-2xl`}>Authorization</p>
                </div>
                <div className={`${styles.formCont} form-body flex`}>
                <Input type="text" onChange={e => setToken(e.currentTarget.value)} value={token} placeholder="Token" className={styles.inputAuth}/>
                <Button variant={'secondary'} disabled={isLoading} onClick={async () => await login()} className={`${styles.btnAuth} rounded-s-none border bg-card`}>
                    {
                        isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        "Please wait"</> : "Log In"
                    }
                    
                    </Button>
                </div>
                <div className="result error-field">
                    {error}
                </div>
            </div>
        </div>
    )
}