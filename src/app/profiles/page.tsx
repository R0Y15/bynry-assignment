'use client';

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Profile } from "@/app/types"
import ProfileCard from "@/app/components/ProfileCard"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import SearchBar from "../components/SearchBar";
import ProfileSummary from "@/components/ProfileSummary";
import { Pagination } from "@/components/ui/pagination";
import axios from "axios";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 20;

export default function ProfilesPage() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filters, setFilters] = useState({ query: "" })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filters])

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profileDetails`)
      setProfiles(response.data)
    } catch (error) {
      console.error('Error fetching profiles:', error)
      toast.error('Failed to fetch profiles')
    } finally {
      setLoading(false)
    }
  }

  const filteredProfiles = profiles.filter((profile) => {
    if (!filters.query) return true
    const searchFields = [
      profile.name,
      profile.description,
      profile.location,
      profile.email,
      profile.phone,
    ].filter(Boolean)
    return searchFields.some((field) =>
      field.toLowerCase().includes(filters.query.toLowerCase())
    )
  })

  const totalPages = Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE)
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleViewDetails = (profile: Profile) => {
    router.push(`/profile/${profile.id}`)
  }

  return (
    <div className="container mx-auto py-8">
      <SearchBar filters={filters} onFiltersChange={setFilters} />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : paginatedProfiles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginatedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onViewDetails={handleViewDetails}
                onSummaryClick={() => setSelectedProfile(profile)}
              />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No profiles found matching your search criteria.</p>
        </div>
      )}
      <Dialog open={selectedProfile !== null} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        <DialogContent className="p-0">
          <DialogTitle className="sr-only">
            {selectedProfile?.name} Profile Summary
          </DialogTitle>
          {selectedProfile && (
            <ProfileSummary 
              profile={selectedProfile} 
              onClose={() => setSelectedProfile(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 