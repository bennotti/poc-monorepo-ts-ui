
import fs from 'fs';
import sample from './index';

describe('sample', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation((msg) => msg);
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation((msg) => msg);
    // const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => code as never);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have an execute method', () => {
        expect(sample.execute).toBeDefined();
        expect(typeof sample.execute).toEqual('function');
    });

    it('should exit on unexpected error', () => {
        sample.execute();
        expect(mockConsoleError).toHaveBeenCalled();
        // expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should be valid when for conventional commits', () => {
        const messages: Array<string> = [];

        messages.forEach((msg) => {
            jest.clearAllMocks();
            jest.spyOn(fs, 'readFileSync').mockImplementation(() => msg);
            sample.execute();
            // expect(mockExit).toHaveBeenCalledWith(0);
        });
    });

    it('should fail validation when not a conventional commit', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'not a conventional commit');
        sample.execute();
        // expect(mockExit).toHaveBeenCalledWith(1);
        expect(mockConsoleLog).toHaveBeenCalledWith(
            'Cannot commit: the commit message does not comply with conventional commits standards.'
        );
    });
});
