# Frontend API Usage Guide

This guide shows how to use the API services in your React components.

## Setup

1. **Environment Variable**: Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. **Import the API**: Import the API service or hooks in your components.

---

## Method 1: Using API Service Directly

### Authentication Examples

```javascript
import api from '../services/api';

// Signup
const handleSignup = async () => {
  try {
    const result = await api.auth.signup({
      email: 'user@example.com',
      password: 'password123',
      userType: 'influencer', // or 'startup'
      name: 'John Doe',
      companyName: 'Tech Inc' // Only for startups
    });
    
    // Save token to localStorage
    localStorage.setItem('authToken', result.token);
    console.log('User:', result.user);
  } catch (error) {
    console.error('Signup failed:', error.message);
  }
};

// Login
const handleLogin = async () => {
  try {
    const result = await api.auth.login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    localStorage.setItem('authToken', result.token);
    console.log('Logged in:', result.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const result = await api.auth.getMe();
    console.log('Current user:', result.user);
  } catch (error) {
    console.error('Failed to get user:', error.message);
  }
};
```

### Influencer Examples

```javascript
// Create/Update Profile
const createProfile = async () => {
  try {
    const result = await api.influencer.createOrUpdateProfile({
      name: 'John Doe',
      bio: 'Fashion & Lifestyle Influencer',
      followersCount: 50000,
      category: 'fashion',
      instagramUsername: 'johndoe',
      instagramEmbedLinks: [
        'https://www.instagram.com/p/ABC123/embed',
        'https://www.instagram.com/p/DEF456/embed'
      ],
      linkedinProfileUrl: 'https://www.linkedin.com/in/johndoe',
      linkedinEmbedLinks: [
        'https://www.linkedin.com/embed/feed/update/urn:li:activity:1234567890'
      ],
      platforms: ['instagram', 'linkedin']
    });
    
    console.log('Profile created:', result.data);
  } catch (error) {
    console.error('Failed to create profile:', error.message);
  }
};

// Update Embed Links
const updateEmbeds = async () => {
  try {
    const result = await api.influencer.updateEmbedLinks({
      platform: 'instagram', // or 'linkedin'
      embedLinks: [
        'https://www.instagram.com/p/NEW1/embed',
        'https://www.instagram.com/p/NEW2/embed',
        'https://www.instagram.com/p/NEW3/embed'
      ]
    });
    
    console.log('Embeds updated:', result.data);
  } catch (error) {
    console.error('Failed to update embeds:', error.message);
  }
};

// Get My Profile
const getMyProfile = async () => {
  try {
    const result = await api.influencer.getMyProfile();
    console.log('My profile:', result.data);
  } catch (error) {
    console.error('Failed to get profile:', error.message);
  }
};

// Browse All Influencers
const browseInfluencers = async () => {
  try {
    const result = await api.influencer.getAllInfluencers({
      category: 'fashion',
      minFollowers: 10000,
      maxFollowers: 100000,
      page: 1,
      limit: 10
    });
    
    console.log('Influencers:', result.data);
    console.log('Total pages:', result.totalPages);
  } catch (error) {
    console.error('Failed to get influencers:', error.message);
  }
};

// Get Influencer by ID
const getInfluencer = async (id) => {
  try {
    const result = await api.influencer.getInfluencerById(id);
    console.log('Influencer:', result.data);
  } catch (error) {
    console.error('Failed to get influencer:', error.message);
  }
};

// Get Influencer Embeds
const getEmbeds = async (id) => {
  try {
    // Get all embeds
    const result = await api.influencer.getInfluencerEmbeds(id);
    
    // Or get platform-specific embeds
    const instagramEmbeds = await api.influencer.getInfluencerEmbeds(id, 'instagram');
    const linkedinEmbeds = await api.influencer.getInfluencerEmbeds(id, 'linkedin');
    
    console.log('Embeds:', result.data);
  } catch (error) {
    console.error('Failed to get embeds:', error.message);
  }
};

// Get Profile Interests (who's interested in me)
const getProfileInterests = async () => {
  try {
    const result = await api.influencer.getProfileInterests();
    console.log('Startups interested in me:', result.data);
  } catch (error) {
    console.error('Failed to get interests:', error.message);
  }
};
```

### Startup Examples

```javascript
// View Influencer Profile (uses 1 view from quota)
const viewProfile = async (influencerId) => {
  try {
    const result = await api.startup.viewInfluencerProfile(influencerId);
    console.log('Influencer profile:', result.data);
    console.log('Views remaining:', result.viewsRemaining);
  } catch (error) {
    console.error('Failed to view profile:', error.message);
  }
};

// Mark Interest in Influencer
const markInterest = async (influencerId) => {
  try {
    const result = await api.startup.markInterest(
      influencerId,
      'Interested in collaboration for our new product launch'
    );
    console.log('Interest marked:', result.data);
  } catch (error) {
    console.error('Failed to mark interest:', error.message);
  }
};

// Get My Interests
const getMyInterests = async () => {
  try {
    const result = await api.startup.getMyInterests();
    console.log('My interests:', result.data);
  } catch (error) {
    console.error('Failed to get interests:', error.message);
  }
};
```

---

## Method 2: Using React Hooks (Recommended)

The hooks provide automatic loading and error state management.

### Authentication with Hooks

```javascript
import { useAuth } from '../hooks/useAPI';

function LoginComponent() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login.execute({
        email: 'user@example.com',
        password: 'password123'
      });

      localStorage.setItem('authToken', result.token);
      console.log('Logged in!');
    } catch (error) {
      // Error is already set in login.error
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={login.loading}>
        {login.loading ? 'Logging in...' : 'Login'}
      </button>
      {login.error && <p className="error">{login.error}</p>}
    </div>
  );
}
```

### Influencer Operations with Hooks

```javascript
import { useInfluencer } from '../hooks/useAPI';
import { useEffect } from 'react';

function InfluencerProfileComponent() {
  const { getMyProfile, updateEmbedLinks } = useInfluencer();

  useEffect(() => {
    // Load profile on mount
    getMyProfile.execute();
  }, []);

  const handleUpdateEmbeds = async () => {
    try {
      await updateEmbedLinks.execute({
        platform: 'instagram',
        embedLinks: [
          'https://www.instagram.com/p/NEW1/embed',
          'https://www.instagram.com/p/NEW2/embed'
        ]
      });

      // Reload profile after update
      getMyProfile.execute();
    } catch (error) {
      console.error('Update failed');
    }
  };

  if (getMyProfile.loading) return <div>Loading...</div>;
  if (getMyProfile.error) return <div>Error: {getMyProfile.error}</div>;

  return (
    <div>
      <h1>{getMyProfile.data?.data?.name}</h1>
      <button onClick={handleUpdateEmbeds} disabled={updateEmbedLinks.loading}>
        {updateEmbedLinks.loading ? 'Updating...' : 'Update Embeds'}
      </button>
    </div>
  );
}
```

### Browse Influencers with Hooks

```javascript
import { useInfluencer } from '../hooks/useAPI';
import { useState, useEffect } from 'react';

function BrowseInfluencersComponent() {
  const { getAllInfluencers } = useInfluencer();
  const [filters, setFilters] = useState({
    category: '',
    minFollowers: '',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    getAllInfluencers.execute(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  if (getAllInfluencers.loading) return <div>Loading influencers...</div>;
  if (getAllInfluencers.error) return <div>Error: {getAllInfluencers.error}</div>;

  return (
    <div>
      <select onChange={(e) => handleFilterChange('category', e.target.value)}>
        <option value="">All Categories</option>
        <option value="fashion">Fashion</option>
        <option value="tech">Tech</option>
        <option value="food">Food</option>
      </select>

      <div className="influencers-grid">
        {getAllInfluencers.data?.data?.map(influencer => (
          <div key={influencer._id}>
            <h3>{influencer.name}</h3>
            <p>{influencer.followersCount} followers</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          disabled={filters.page === 1}
        >
          Previous
        </button>
        <span>Page {filters.page} of {getAllInfluencers.data?.totalPages}</span>
        <button
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          disabled={filters.page === getAllInfluencers.data?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Startup Operations with Hooks

```javascript
import { useStartup } from '../hooks/useAPI';

function StartupDashboardComponent() {
  const { viewInfluencerProfile, markInterest, getMyInterests } = useStartup();

  useEffect(() => {
    getMyInterests.execute();
  }, []);

  const handleViewProfile = async (influencerId) => {
    try {
      const result = await viewInfluencerProfile.execute(influencerId);
      console.log('Views remaining:', result.viewsRemaining);
    } catch (error) {
      console.error('Failed to view profile');
    }
  };

  const handleMarkInterest = async (influencerId) => {
    try {
      await markInterest.execute(influencerId, 'Interested in collaboration');
      // Reload interests
      getMyInterests.execute();
    } catch (error) {
      console.error('Failed to mark interest');
    }
  };

  return (
    <div>
      <h2>My Interests</h2>
      {getMyInterests.loading && <div>Loading...</div>}
      {getMyInterests.data?.data?.map(interest => (
        <div key={interest._id}>
          <h3>{interest.influencerId.name}</h3>
          <p>{interest.note}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## API Response Formats

All API responses follow this structure:

```javascript
{
  success: true,
  data: { ... },      // Response data
  message: "...",     // Optional message
  token: "...",       // Only for auth endpoints
  // Pagination fields (for list endpoints)
  count: 10,
  totalCount: 45,
  totalPages: 5,
  currentPage: 1
}
```

## Error Handling

Errors are thrown with descriptive messages:

```javascript
try {
  await api.auth.login({ email, password });
} catch (error) {
  // error.message contains the error description
  console.error(error.message);
}
```

## Categories

Available influencer categories:
- `fashion`
- `fitness`
- `food`
- `travel`
- `tech`
- `lifestyle`
- `beauty`
- `gaming`
- `b2b`
- `other`

## Platforms

Supported platforms:
- `instagram`
- `linkedin`


