
class MobileDevice {
  commands: string[] = [];
  directoryStructure = {
    root: {
      childOf: null,
      items: [],
    }
  };

  /**
   * Takes a string of commands and runs them
   */
  loadSystemCommands = (commands: string[]) => {
    this.commands = commands;
    this.commands.forEach((command, index) => {
      if(this.isInputCommand(command)){
        this.executeInputCommand(command, index)
      }
    })
    // this.generateHierarchy();
  }

  /**
   * Returns true/false if the current command is an input from us
   * @param command
   */
  isInputCommand = (command: string) => {
    const regex = new RegExp('[$]');
    return regex.test(command);
  }

  isFileCommand = (command: string) => {
    const numberRegex = new RegExp('\\d+');
    return numberRegex.test(command)
  }

  isDirectoryCommand = (command: string) => {
    const directoryRegex = new RegExp(/dir |\//gm);
    return directoryRegex.test(command)
  }

  /**
   * Given a command, try and execute it, we only need to support LS at the moment as we can work out the tree
   * structure just based off that information and the previous command
   * @param command
   * @param index
   */
  executeInputCommand = (command: string, index) => {
    const input = command.replace('$ ','');

    switch(input.slice(0,2)){
      case 'ls':
        const directory = this.commands[index-1].replace('$ cd ','');
        const items = this.loadDirectoryFromCommandIndex(directory, index);
        console.log(`items for ${directory}`);
        console.log(items);
        console.log('---------');
        break;
    }
  }

  /**
   * Takes what is in the directory structure and re-generates the hierarchy based on the data in there.
   */
  private generateHierarchy = () => {
    let hierarchy = {};
    Object.keys(this.directoryStructure).forEach((d) => {
      const childFolders = Object.keys(this.directoryStructure).filter((key) => {
        return this.directoryStructure[key].childOf === d;
      })
      console.log(childFolders);
    })

  }

  private hasParentDirectory = (directoryName: string) => {
    return this.directoryStructure[directoryName].childOf !== null
  }

  /**
   * Takes the index of the command and looks ahead until we find another command, until then we load
   * all of the lines into the directory structure.
   * @param directory
   * @param index
   */
  private loadDirectoryFromCommandIndex = (directory, index) => {
    let items = [];
    this.commands.slice(index+1).some((command) => {

      if(this.isInputCommand(command)){
        return true;
      }
      if(this.isDirectoryCommand(command)){
        items.push(this.addDirectory(command.replace('dir ',''), directory.replace('/','root')));
        return false;
      }
      if(this.isFileCommand(command)){
        items.push(command);
        return false;
      }
    })
    return items;
  }

  /**
   * Adds a directory to the top level of the directoryStructure.
   * @param directoryName
   * @param parentDirectory
   */
  private addDirectory = (directoryName: string, parentDirectory: string) => {
    return {
      name: directoryName,
      childOf: parentDirectory,
      items: [],
    };
  }
}

const mobileDevice = new MobileDevice();
export default mobileDevice;
