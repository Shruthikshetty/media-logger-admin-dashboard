import TitleSubtitle from '~/components/title-subtitle';

/**
 * This is the default tab that opens up when the app is opened
 * This is the dashboard containing all media concise information
 */
export default function Home() {
  return (
    <div className='p-5'>
      <TitleSubtitle
        title="Media Management Dashboard"
        subtitle="manage your media library efficiently"
      />
    </div>
  );
}
