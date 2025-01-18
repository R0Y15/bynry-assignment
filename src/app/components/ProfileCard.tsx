"use client"

import { Profile } from "@/app/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

interface ProfileCardProps {
    profile: Profile
    onViewDetails: (profile: Profile) => void
    onSummaryClick: () => void
}

export default function ProfileCard({ profile, onViewDetails, onSummaryClick }: ProfileCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    {profile.avatar ? (
                        <Image
                            src={profile.avatar}
                            alt={profile.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">{profile.name[0].toUpperCase()}</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="mb-2">{profile.name}</CardTitle>
                <p className="text-sm text-gray-500 mb-4">{profile.description}</p>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-brand" />
                        <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-brand" />
                        <a
                            href={`mailto:${profile.email}`}
                            className="hover:text-brand transition-colors"
                        >
                            {profile.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-brand" />
                        <a
                            href={`tel:${profile.phone}`}
                            className="hover:text-brand transition-colors"
                        >
                            {profile.phone}
                        </a>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => onViewDetails(profile)}
                    >
                        View Details
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onSummaryClick}
                    >
                        Quick View
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 