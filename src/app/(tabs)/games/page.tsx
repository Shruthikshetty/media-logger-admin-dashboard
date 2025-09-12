'use client';
import React from 'react';
import JsonImporter from '~/components/json-importer';

//@todo screen in progress
const GamesTab = () => {
  return (
    <div className="text-feedback-success-light p-5 text-3xl">
      <JsonImporter
        onSuccess={(file) => {
          console.log('success');
        }}
      />
    </div>
  );
};

export default GamesTab;
