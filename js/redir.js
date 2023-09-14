const buttons = document.querySelectorAll('.pro-btn');

    // Add click event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the button's ID
            const buttonId = this.id;

            // Redirect based on the button's ID
            switch (buttonId) {
                case "asma-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/ASMA-A-Stock-Market-Analyser'; // Replace with your desired URL
                    break;
                case "hazel-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/Hazel-A-Voice-Based-Virtual-Assistant'; // Replace with your desired URL
                    break;
                case "ocr-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/ShortProject_Optical_Character_Recognition'; // Replace with your desired URL
                    break;
                case "filteram-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/ShortProject_Filteram'; // Replace with your desired URL
                    break;
                case "jumbleg-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/MiniGame_JUMBLEG'; // Replace with your desired URL
                    break;
                case "zupee-link":
                    window.location.href = 'https://github.com/RahulRoy-rsp/ZupeeTrumpCardsMania'; // Replace with your desired URL
                    break;
                default:
                    // Handle any other cases or errors
                    break;
            }
        });
    });