'use client';

import { Profile } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import Map from "@/app/components/Map";

interface ProfileSummaryProps {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileSummary({ profile, onClose }: ProfileSummaryProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{profile.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-[200px] rounded-lg overflow-hidden">
          <Map profile={profile} />
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-brand mt-1" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-gray-500">{profile.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="h-5 w-5 text-brand mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <a 
                href={`mailto:${profile.email}`} 
                className="text-sm text-brand hover:text-brand-dark transition-colors"
              >
                {profile.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="h-5 w-5 text-brand mt-1" />
            <div>
              <p className="font-medium">Phone</p>
              <a 
                href={`tel:${profile.phone}`}
                className="text-sm text-brand hover:text-brand-dark transition-colors"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 