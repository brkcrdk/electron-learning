import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleButtonClick = () => {
    // window.electronAPI preload script'ten expose edilen API
    if (window.electronAPI) {
      window.electronAPI.createUserEvent('test');
      console.log('IPC mesajı gönderildi');
    } else {
      console.error('electronAPI bulunamadı');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello "/"!</h1>
      <button
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        IPC Mesajı Gönder
      </button>
    </div>
  );
}
