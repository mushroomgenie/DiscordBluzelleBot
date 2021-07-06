# DiscordBluzelleBot
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Bluzelle Discord Bot has 4 commands for retrieving data from bluzelle mainnet, bluzelle testnet and coingecko. 

### Built With

* [node.js](https://nodejs.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Node.js installed on your development machine. To install this on macOS or Ubuntu 18.04, follow the steps from [this link] (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos)
* Any text editor of your choice
* A free Discord account with a verified email account and a free Discord server you will use to test your Discord bot

### Installation

1. Setting Up a Discord Bot and get the bot’s token
   * In order to register a bot on the Discord platform, use the Discord application dashboard. Here developers can create Discord applications including Discord bots.
  
   ![11](images/11.png)
   * Click New Application. Discord will ask you to enter a name for your new application. Then click Create to create the application.
    
   ![12](images/12.png)
   * Now open up your application dashboard. To add a bot to the application, navigate to the Bot tab on the navigation bar to the left.
   
   ![13](images/13.png)
   * Click the Add Bot button to add a bot to the application
   
   ![14](images/14.png)
   * Click the Yes, do it! button when it prompts you for confirmation. You will then be on a dashboard containing details of your bot’s name, authentication token, and profile picture.
   
   ![15](images/15.png)
   * navigate to the OAuth2 tab of the application dashboard. To create an invite, scroll down and select bot under scopes.
   
   ![16](images/16.png)
   * You must also set permissions to control what actions your bot can perform in guilds. For the purposes of this simplicity, select Administrator. Copy the link with the Copy button (under scopes).
   
   ![17](images/17.png)
   * Next, add the bot to a server. Follow the invite link you just created. You can add the bot to any server you own, or have administrator permissions in, from the drop-down menu. Now click Continue. Ensure you have the tickbox next to Administrator ticked, this will grant the bot administrator permissions. Then click Authorize.
   
   ![18](images/18.png)
   * You’ll now have the Discord bot on the members list in the server you added the bot to under offline.
   
   ![19](images/19.png)
3. Clone the repo
   ```sh
   git clone https://github.com/mushroomgenie/DiscordBluzelleBot.git
   ```
   or download it directly
   * You also need to copy the bot’s authentication token by clicking Click to Reveal Token and copying the token that appears. and paste it in the .env file
   ![21](images/21.png)
  



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
