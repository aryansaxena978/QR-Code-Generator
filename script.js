document.addEventListener('DOMContentLoaded', () => {
            // DOM Elements
            const inputText = document.getElementById('inputText');
            const generateBtn = document.getElementById('generateBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            const qrImage = document.getElementById('qrImage');
            const qrPlaceholder = document.querySelector('.qr-placeholder');
            
            // Event Listeners
            generateBtn.addEventListener('click', generateQR);
            downloadBtn.addEventListener('click', downloadQR);
            inputText.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    generateQR();
                }
            });
            
            // Functions
            function generateQR() {
                const text = inputText.value.trim();
                
                if (!text) {
                    showError('Please enter some text or URL');
                    return;
                }
                
                qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
                
                qrImage.onload = () => {
                    qrPlaceholder.style.display = 'none';
                    qrImage.style.display = 'block';
                    downloadBtn.style.display = 'block';
                };
                
                qrImage.onerror = () => {
                    showError('Failed to generate QR code. Please try again.');
                };
            }
            
            function downloadQR() {
                if (!qrImage.src) return;
                
                const link = document.createElement('a');
                link.href = qrImage.src;
                link.download = `qrcode-${new Date().getTime()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            function showError(message) {
                alert(message);
                inputText.focus();
            }
        });