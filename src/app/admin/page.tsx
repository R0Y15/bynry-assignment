'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Profile } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ProfileForm from '@/app/components/ProfileForm';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 20;

export default function AdminPanel() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('adminToken');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profileDetails`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfiles(response.data);
    } catch (error) {
      toast.error('Failed to fetch profiles');
      console.error('Error fetching profiles:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleSignOut();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    Cookies.remove('adminToken');
    router.push('/admin/signin');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;

    try {
      const token = Cookies.get('adminToken');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/profileDetails/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile deleted successfully');
      fetchProfiles();
    } catch (error) {
      toast.error('Failed to delete profile');
      console.error('Error deleting profile:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleSignOut();
      }
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData: Omit<Profile, 'id'>) => {
    try {
      const token = Cookies.get('adminToken');
      if (editingProfile) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/profileDetails/${editingProfile.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Profile updated successfully');
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/profileDetails`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Profile created successfully');
      }
      setIsFormOpen(false);
      fetchProfiles();
    } catch (error) {
      toast.error(editingProfile ? 'Failed to update profile' : 'Failed to create profile');
      console.error('Error saving profile:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleSignOut();
      }
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(query) ||
      profile.location.toLowerCase().includes(query) ||
      profile.email.toLowerCase().includes(query) ||
      profile.phone.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-64 pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleCreate}
              className="inline-flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Profile
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="animate-pulse space-y-4 p-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Profile
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Location
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Contact
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {paginatedProfiles.map((profile) => (
                        <tr key={profile.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                {profile.avatar ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={profile.avatar}
                                    alt=""
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xl text-gray-500">
                                      {profile.name[0].toUpperCase()}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{profile.name}</div>
                                <div className="text-gray-500 text-sm truncate max-w-md">
                                  {profile.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {profile.location}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div>{profile.email}</div>
                            <div>{profile.phone}</div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(profile)}
                              className="text-brand hover:text-brand-dark mr-2"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(profile.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}

        {isFormOpen && (
          <ProfileForm
            profile={editingProfile}
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
} 