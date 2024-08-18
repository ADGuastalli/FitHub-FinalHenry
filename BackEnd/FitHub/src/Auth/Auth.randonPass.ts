import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class PasswordService {
  private readonly lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private readonly uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly numericChars = '0123456789';
  private readonly specialChars = '!@#$%?';

  generateSecurePassword(length: number = 8): string {
    if (length < 4) {
      throw new Error('Password length must be at least 4 characters');
    }

    // Ensure at least one character from each category
    const passwordArray = [
      this.getRandomChar(this.lowercaseChars),
      this.getRandomChar(this.uppercaseChars),
      this.getRandomChar(this.numericChars),
      this.getRandomChar(this.specialChars),
    ];

    // Generate the remaining characters
    const remainingLength = length - 4;
    const allChars = this.lowercaseChars + this.uppercaseChars + this.numericChars + this.specialChars;
    for (let i = 0; i < remainingLength; i++) {
      passwordArray.push(this.getRandomChar(allChars));
    }

    // Shuffle the array to avoid predictable patterns
    return this.shuffleArray(passwordArray).join('');
  }

  private getRandomChar(chars: string): string {
    const bytes = randomBytes(1);
    const index = bytes[0] % chars.length;
    return chars.charAt(index);
  }

  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
