"use client"
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/i0caqiAiOZb
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card, } from "@/components/ui/card"
import { Select, SelectTrigger, SelectGroup, SelectContent, SelectValue, SelectItem, } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { saveConnectionAction } from "@/app/actions"
import Link from "next/link"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormStatus, useFormState } from "react-dom"
import { useForm } from "react-hook-form"

const saveSchema = z.object({
  type: z.string(),
  name: z.string().optional(),
  host: z.string(),
  username: z.string().optional(),
  password: z.string().optional(),
  port: z.number().nonnegative().optional(),
  secure: z.boolean().optional(),
})

const initialState = {
  type: undefined,
  message: null,
}

export function AddConnection() {
  const form = useForm<z.infer<typeof saveSchema>>({
    resolver: zodResolver(saveSchema),
    defaultValues: {
      type: "ftp",
      port: 21,
      secure: false,
    },
  })

  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(saveConnectionAction, initialState)
  console.log('state', state)
  
  function onSubmit(values: z.infer<typeof saveSchema>) {
    toast({ description: state.errors ? JSON.stringify(state.errors) : state.message })
  }

  return (
    <form
      action={formAction}
      className="w-full max-w-md text-base-content"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Add new connection</CardTitle>
          <CardDescription className="pb-4">
            Enter the details of the server you want to connect to
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="connectionType">Select a connection type</Label>
            <Select defaultValue="ftp" name="type">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ftp">FTP</SelectItem>
                  <SelectItem value="ftps">FTPS</SelectItem>
                  <SelectItem value="http">HTTP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="host">name</Label>
            <Input name="name" placeholder="optional" type="text" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="host">host</Label>
            <Input
              name="host"
              placeholder="ftp.example.com"
              required
              type="text"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">username</Label>
            <Input
              name="username"
              placeholder="optional"
              type="text"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">password</Label>
            <Input
              placeholder="optional"
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="port">port</Label>
            <Input name="port" placeholder="optional" type="number" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="secure">secure</Label>
            <div className="flex items-center space-x-2">
              <Checkbox name="secure" id="secure" />
              <Label htmlFor="secure">Enable FTPS</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="my-4 px-0 flex justify-between">
          <div className="flex space-x-2">
            <Link href="/connections">
              <Button variant="outline">Back</Button>
            </Link>
            <Button className="mr-2" variant="outline" aria-disabled={pending}>
              Save without connecting
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-content"
            aria-disabled={pending}
          >
            Save and Connect
          </Button>
        </CardFooter>
      </Card>

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
