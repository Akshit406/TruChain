import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../hooks/useWeb3';
import ManufacturerPanel from './RolePanels/ManufacturerPanel';
import DistributorPanel from './RolePanels/DistributorPanel';
import RetailerPanel from './RolePanels/RetailerPanel';
import ConsumerPanel from './RolePanels/ConsumerPanel';
import LoadingIndicator from '../LoadingIndicator';

const RoleViewSwitcher = () => {
  const { roles, loading: rolesLoading } = useWeb3();
  const [activeRole, setActiveRole] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);

  // Determine available roles whenever roles change
  useEffect(() => {
    if (!roles) return;

    const roleMap = {
      manufacturer: {
        key: 'isManufacturer',
        component: ManufacturerPanel,
        label: 'Manufacturer'
      },
      distributor: {
        key: 'isDistributor',
        component: DistributorPanel,
        label: 'Distributor'
      },
      retailer: {
        key: 'isRetailer',
        component: RetailerPanel,
        label: 'Retailer'
      },
      consumer: {
        key: 'isConsumer',
        component: ConsumerPanel,
        label: 'Consumer'
      }
    };

    const userRoles = Object.entries(roleMap)
      .filter(([_, { key }]) => roles[key])
      .map(([roleKey, roleData]) => ({
        key: roleKey,
        ...roleData
      }));

    setAvailableRoles(userRoles);

    // Set initial active role if not set or if current active role is no longer available
    if (userRoles.length > 0 && (!activeRole || !userRoles.some(r => r.key === activeRole))) {
      setActiveRole(userRoles[0].key);
    }
  }, [roles, activeRole]);

  if (rolesLoading) {
    return <LoadingIndicator />;
  }

  if (availableRoles.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">No Roles Assigned</h2>
        <p className="text-gray-400">
          Your wallet address doesn't have any roles assigned in the supply chain.
        </p>
        <p className="text-gray-400 mt-2">
          Contact an administrator to get assigned a role.
        </p>
      </div>
    );
  }

  const ActivePanelComponent = availableRoles.find(r => r.key === activeRole)?.component;

  return (
    <div className="space-y-6">
      {/* Role Switcher Tabs */}
      {availableRoles.length > 1 && (
        <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-4">
          {availableRoles.map((role) => (
            <button
              key={role.key}
              onClick={() => setActiveRole(role.key)}
              className={`px-4 py-2 rounded-t-md transition-colors ${
                activeRole === role.key
                  ? 'bg-accent-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      )}

      {/* Active Role Panel */}
      <div className="fade-in">
        {ActivePanelComponent ? <ActivePanelComponent /> : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-gray-400">No panel available for selected role</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleViewSwitcher;