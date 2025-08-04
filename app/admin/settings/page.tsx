"use client";

import React from 'react';

import TopBar from "@/components/layout/TopBar"

export default function SettingsPage() {
    return (
        <div>
            <TopBar titleName="Settings" />
            <div>
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
                  <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 transition-all dark:border-gray-600"></div>
                  </label>
              </div>
            </div>
        </div>
    )
};
