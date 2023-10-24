"use client"

import { MenuIcon, ShoppingCartIcon, LogInIcon, LogOutIcon, HomeIcon, PercentCircleIcon, ListOrderedIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
    const { status, data } = useSession();

    const handleLogin = async () => {
        await signIn("google");
    }

    const handleLogout = async () => {
        await signOut();
    }

    return (
        <Card className="flex items-center justify-between p-[1.875rem]">

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader className="text-left text-lg font-semibold">
                        Menu
                    </SheetHeader>

                    {status === "authenticated" && data?.user && (
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 py-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.user.name?.[0].toUpperCase()}
                                    </AvatarFallback>

                                    {data.user.image && (
                                        <AvatarImage src={data.user.image} />
                                    )}
                                </Avatar>

                                <div className="flex flex-col">
                                    <p className="font-medium">{data.user.name}</p>
                                    <p className="text-sm opacity-75">Boas compras!</p>
                                </div>

                            </div>
                            <Separator />
                        </div>
                    )}

                    <div className="mt-2 flex flex-col gap-3">
                        {status === "unauthenticated" && (
                            <Button onClick={handleLogin} variant="outline" className="w-full justify-start gap-2">
                                <LogInIcon size={16} />
                                Fazer login com Google
                            </Button>
                        )}

                        {status === "authenticated" && (
                            <>
                                <SheetClose asChild>
                                    <Link href="/">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <HomeIcon size={16} />
                                            Início
                                        </Button>
                                    </Link>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Link href="/deals">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <PercentCircleIcon size={16} />
                                            Ofertas
                                        </Button>
                                    </Link>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Link href="/catalog">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <ListOrderedIcon size={16} />
                                            Catálogo
                                        </Button>
                                    </Link>
                                </SheetClose>


                                <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2">
                                    <LogOutIcon size={16} />
                                    Sair
                                </Button>
                            </>
                        )}

                    </div>

                </SheetContent>
            </Sheet>

            <Link href="/">
                <h1 className="text-lg font-semibold">
                    <span className="text-primary">NIC</span>
                    STORE
                </h1>
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <ShoppingCartIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent>
                    <Cart />
                </SheetContent>
            </Sheet>
        </Card>
    )
}

export default Header;