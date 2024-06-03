import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const handler = async (m, { conn, text }) => {
  if (conn.user.jid === conn.user.jid) {
    const pluginDir = process.cwd(); // Current working directory or specify the correct path

    // Function to check if the directory is a Git repository
    const isGitRepository = (directory) => {
      return existsSync(join(directory, '.git'));
    };

    if (isGitRepository(pluginDir)) {
      try {
        let stdout = execSync(`git pull https://github.com/Xcelsama/STAR-V2 ${text ? text : ''}`);
        conn.reply(m.chat, stdout.toString(), m);
      } catch (error) {
        conn.reply(m.chat, `Error occurred: ${error.message}`, m);
      }
    } else {
      conn.reply(m.chat, 'Error: Not a git repository', m);
    }
  }
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'actualizar', 'fix', 'fixed'];
handler.rowner = true;

export default handler;