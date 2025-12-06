import React, { useState, useEffect } from 'react';
import { useAuth, useInfluencer, useStartup } from '../hooks/useAPI';

/**
 * Example component demonstrating all API integrations
 * This is a reference implementation - copy patterns to your actual components
 */

// ==================== AUTH EXAMPLE ====================
export const AuthExample = () => {
  const { signup, login, getMe } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'influencer',
    name: ''
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signup.execute(formData);
      localStorage.setItem('authToken', result.token);
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login.execute({
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('authToken', result.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Authentication Example</h2>
      
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="influencer">Influencer</option>
          <option value="startup">Startup</option>
        </select>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSignup}
            disabled={signup.loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {signup.loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={handleLogin}
            disabled={login.loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {login.loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      
      {signup.error && <p className="text-red-600 mt-2">Signup Error: {signup.error}</p>}
      {login.error && <p className="text-red-600 mt-2">Login Error: {login.error}</p>}
    </div>
  );
};

// ==================== INFLUENCER PROFILE EXAMPLE ====================
export const InfluencerProfileExample = () => {
  const { createOrUpdateProfile, getMyProfile, updateEmbedLinks } = useInfluencer();
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    followersCount: 0,
    category: 'fashion',
    instagramUsername: '',
    instagramEmbedLinks: [],
    linkedinProfileUrl: '',
    linkedinEmbedLinks: [],
    platforms: ['instagram']
  });

  useEffect(() => {
    // Load profile on mount
    getMyProfile.execute();
  }, []);

  useEffect(() => {
    // Populate form when profile loads
    if (getMyProfile.data?.data) {
      setProfileData(getMyProfile.data.data);
    }
  }, [getMyProfile.data]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateProfile.execute(profileData);
      alert('Profile saved!');
      getMyProfile.execute(); // Reload
    } catch (error) {
      alert('Failed to save profile: ' + error.message);
    }
  };

  const handleUpdateEmbeds = async () => {
    try {
      await updateEmbedLinks.execute({
        platform: 'instagram',
        embedLinks: profileData.instagramEmbedLinks
      });
      alert('Embeds updated!');
    } catch (error) {
      alert('Failed to update embeds: ' + error.message);
    }
  };

  if (getMyProfile.loading) return <div>Loading profile...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Influencer Profile Example</h2>

      <form onSubmit={handleCreateProfile} className="space-y-4">
        {/* Form fields here - simplified for example */}
        <button
          type="submit"
          disabled={createOrUpdateProfile.loading}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          {createOrUpdateProfile.loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

// ==================== BROWSE INFLUENCERS EXAMPLE ====================
export const BrowseInfluencersExample = () => {
  const { getAllInfluencers, getInfluencerById, getInfluencerEmbeds } = useInfluencer();
  const [filters, setFilters] = useState({
    category: '',
    minFollowers: '',
    maxFollowers: '',
    page: 1,
    limit: 10
  });
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  useEffect(() => {
    // Load influencers when filters change
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.minFollowers) params.minFollowers = filters.minFollowers;
    if (filters.maxFollowers) params.maxFollowers = filters.maxFollowers;
    params.page = filters.page;
    params.limit = filters.limit;

    getAllInfluencers.execute(params);
  }, [filters]);

  const handleViewInfluencer = async (id) => {
    try {
      const result = await getInfluencerById.execute(id);
      setSelectedInfluencer(result.data);

      // Also load embeds
      await getInfluencerEmbeds.execute(id);
    } catch (error) {
      alert('Failed to load influencer: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Browse Influencers Example</h2>

      {/* Filters */}
      <div className="mb-4 space-y-2">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="tech">Tech</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="fitness">Fitness</option>
          <option value="beauty">Beauty</option>
          <option value="gaming">Gaming</option>
          <option value="b2b">B2B</option>
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Followers"
            value={filters.minFollowers}
            onChange={(e) => setFilters({ ...filters, minFollowers: e.target.value, page: 1 })}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Followers"
            value={filters.maxFollowers}
            onChange={(e) => setFilters({ ...filters, maxFollowers: e.target.value, page: 1 })}
            className="flex-1 p-2 border rounded"
          />
        </div>
      </div>

      {/* Results */}
      {getAllInfluencers.loading && <div>Loading influencers...</div>}
      {getAllInfluencers.error && <div className="text-red-600">Error: {getAllInfluencers.error}</div>}

      {getAllInfluencers.data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {getAllInfluencers.data.data?.map(influencer => (
              <div key={influencer._id} className="border p-4 rounded">
                <h3 className="font-bold">{influencer.name}</h3>
                <p className="text-sm text-gray-600">@{influencer.instagramUsername}</p>
                <p className="text-sm">{influencer.followersCount?.toLocaleString()} followers</p>
                <p className="text-sm capitalize">{influencer.category}</p>
                <button
                  onClick={() => handleViewInfluencer(influencer._id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={filters.page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {getAllInfluencers.data.currentPage} of {getAllInfluencers.data.totalPages}
              ({getAllInfluencers.data.totalCount} total)
            </span>
            <button
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              disabled={filters.page >= getAllInfluencers.data.totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Selected Influencer Details */}
      {selectedInfluencer && (
        <div className="mt-6 p-4 border-t">
          <h3 className="text-xl font-bold mb-2">Selected Influencer</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(selectedInfluencer, null, 2)}
          </pre>

          {getInfluencerEmbeds.data && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">Embed Links:</h4>
              <ul className="list-disc pl-5">
                {getInfluencerEmbeds.data.data?.embedLinks?.map((link, idx) => (
                  <li key={idx} className="text-sm break-all">{link}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==================== STARTUP OPERATIONS EXAMPLE ====================
export const StartupOperationsExample = () => {
  const { viewInfluencerProfile, markInterest, getMyInterests } = useStartup();
  const [influencerId, setInfluencerId] = useState('');
  const [interestNote, setInterestNote] = useState('');

  useEffect(() => {
    // Load my interests on mount
    getMyInterests.execute();
  }, []);

  const handleViewProfile = async () => {
    if (!influencerId) {
      alert('Please enter an influencer ID');
      return;
    }

    try {
      const result = await viewInfluencerProfile.execute(influencerId);
      alert(`Profile viewed! Views remaining: ${result.viewsRemaining}`);
    } catch (error) {
      alert('Failed to view profile: ' + error.message);
    }
  };

  const handleMarkInterest = async () => {
    if (!influencerId) {
      alert('Please enter an influencer ID');
      return;
    }

    try {
      await markInterest.execute(influencerId, interestNote);
      alert('Interest marked successfully!');
      // Reload interests
      getMyInterests.execute();
      setInfluencerId('');
      setInterestNote('');
    } catch (error) {
      alert('Failed to mark interest: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Startup Operations Example</h2>

      {/* View Profile Section */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="font-bold mb-2">View Influencer Profile</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Influencer ID"
            value={influencerId}
            onChange={(e) => setInfluencerId(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleViewProfile}
            disabled={viewInfluencerProfile.loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {viewInfluencerProfile.loading ? 'Loading...' : 'View Profile (Uses 1 View)'}
          </button>
        </div>
        {viewInfluencerProfile.error && (
          <p className="text-red-600 mt-2">{viewInfluencerProfile.error}</p>
        )}
        {viewInfluencerProfile.data && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="font-bold">{viewInfluencerProfile.data.data?.name}</p>
            <p className="text-sm">Views Remaining: {viewInfluencerProfile.data.viewsRemaining}</p>
          </div>
        )}
      </div>

      {/* Mark Interest Section */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="font-bold mb-2">Mark Interest</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Influencer ID"
            value={influencerId}
            onChange={(e) => setInfluencerId(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Note (optional)"
            value={interestNote}
            onChange={(e) => setInterestNote(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <button
            onClick={handleMarkInterest}
            disabled={markInterest.loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {markInterest.loading ? 'Marking...' : 'Mark Interest'}
          </button>
        </div>
        {markInterest.error && (
          <p className="text-red-600 mt-2">{markInterest.error}</p>
        )}
      </div>

      {/* My Interests Section */}
      <div className="p-4 border rounded">
        <h3 className="font-bold mb-2">My Interests</h3>
        {getMyInterests.loading && <div>Loading...</div>}
        {getMyInterests.error && <div className="text-red-600">{getMyInterests.error}</div>}
        {getMyInterests.data && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Total: {getMyInterests.data.count} interests
            </p>
            {getMyInterests.data.data?.map(interest => (
              <div key={interest._id} className="p-3 bg-gray-50 rounded">
                <p className="font-bold">{interest.influencerId?.name}</p>
                <p className="text-sm">@{interest.influencerId?.instagramUsername}</p>
                <p className="text-sm text-gray-600">{interest.note}</p>
                <p className="text-xs text-gray-500">
                  {new Date(interest.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN DEMO COMPONENT ====================
export default function APIExamplesDemo() {
  const [activeTab, setActiveTab] = useState('auth');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">API Integration Examples</h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('auth')}
            className={`px-4 py-2 rounded ${activeTab === 'auth' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Authentication
          </button>
          <button
            onClick={() => setActiveTab('influencer')}
            className={`px-4 py-2 rounded ${activeTab === 'influencer' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Influencer Profile
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded ${activeTab === 'browse' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Browse Influencers
          </button>
          <button
            onClick={() => setActiveTab('startup')}
            className={`px-4 py-2 rounded ${activeTab === 'startup' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Startup Operations
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'auth' && <AuthExample />}
        {activeTab === 'influencer' && <InfluencerProfileExample />}
        {activeTab === 'browse' && <BrowseInfluencersExample />}
        {activeTab === 'startup' && <StartupOperationsExample />}
      </div>
    </div>
  );
}

