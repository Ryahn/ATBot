const config = {
    // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
    "ownerID": "72884988374167552",
  
    // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
    "token": "NzIxNTI1NzI5OTQ2NTAxMTYx.XugWhw.q0wEEQFxeKUinDfoBku41kTUtx8",
  
    // Default per-server settings. New guilds have these settings. 
  
    // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
    // VIA COMMANDS IN THE GUILD.
    
    "defaultSettings" : {
      "prefix": "-",
      "modLogChannel": "mod-log",
      "requestsChannel": "anime-requests",
      "enocersChannel": "encoders",
      "releasesChannel": "anime-releases",
      "announcementsChannel": "announcements",
      "modRole": "Mod",
      "bAdminRole": "Bot Admin",
      "adminRole": "Admin",
      "encoderRole": "Encoder",
      "ownerRole": "Owner",
      "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
      "welcomeChannel": "welcome",
      "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
      "welcomeEnabled": "false"
    },

    database: {
        host: "localhost",
        user: "atbot",
        pass: "$2$44$brwnKuVC8f24XJL8_brwnKuVC8f24XJL8",
        db: "atbot"
    },
  
    // PERMISSION LEVEL DEFINITIONS.
  
    permLevels: [
      // This is the lowest permisison level, this is for non-roled users.
      { level: 0,
        name: "User", 
        // Don't bother checking, just return true which allows them to execute any command their
        // level allows them to.
        check: () => true
      },

      // Encoder
      { level: 1,
        name: "Encoder", 
        // Simple check, if the guild owner id matches the message author's ID, then it will return true.
        // Otherwise it will return false.
        check: (message) => {
            try {
              const encoderRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.encoderRole.toLowerCase());
              if (encoderRole && message.member.roles.has(encoderRole.id)) return true;
            } catch (e) {
              return false;
            }
          }
      },

      // Bot Admin has some limited access like rebooting the bot or reloading commands.
      { level: 2,
        name: "Bot Admin",
        check: (message) => {
            try {
              const bAdminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.bAdminRole.toLowerCase());
              if (bAdminRole && message.member.roles.has(bAdminRole.id)) return true;
            } catch (e) {
              return false;
            }
          }
      },
  
      // This is your permission level, the staff levels should always be above the rest of the roles.
      { level: 3,
        // This is the name of the role.
        name: "Mod",
        // The following lines check the guild the message came from for the roles.
        // Then it checks if the member that authored the message has the role.
        // If they do return true, which will allow them to execute the command in question.
        // If they don't then return false, which will prevent them from executing the command.
        check: (message) => {
          try {
            const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
            if (modRole && message.member.roles.has(modRole.id)) return true;
          } catch (e) {
            return false;
          }
        }
      },
  
      { level: 4,
        name: "Admin", 
        check: (message) => {
          try {
            const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
            return (adminRole && message.member.roles.has(adminRole.id));
          } catch (e) {
            return false;
          }
        }
      },
      // This is the server owner.
      { level: 5,
        name: "Server Owner", 
        // Simple check, if the guild owner id matches the message author's ID, then it will return true.
        // Otherwise it will return false.
        check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
      },
  
      // Bot Support is a special inbetween level that has the equivalent of server owner access
      // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
      { level: 9,
        name: "Bot Support",
        // The check is by reading if an ID is part of this array. Yes, this means you need to
        // change this and reboot the bot to add a support user. Make it better yourself!
        check: (message) => config.support.includes(message.author.id)
      },
  
  
      // This is the bot owner, this should be the highest permission level available.
      // The reason this should be the highest level is because of dangerous commands such as eval
      // or exec (if the owner has that).
      { level: 10,
        name: "Bot Owner", 
        // Another simple check, compares the message author id to the one stored in the config file.
        check: (message) => message.client.config.ownerID === message.author.id
      }
    ]
  };
  
  module.exports = config;