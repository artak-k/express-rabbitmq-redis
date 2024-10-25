import { createClient, RedisClientType } from 'redis';

export interface IQuery {
    id?: string;
    [key: string]: any;
}

class RedisCache {
    private redisClient!: RedisClientType;

    async init() {
        try {
            this.redisClient = createClient();

            this.redisClient.on('error', (error) => {
                console.error('Redis connection error: ', error);
            });

            await this.redisClient.connect();
            console.log('🚀 Redis connected successfully');
        } catch (error: any) {
            console.error('Error initializing Redis: ', error.message);
            throw error;
        }
    }

    async set(key: string, value: any): Promise<void> {
        try {
            await this.redisClient.set(key, JSON.stringify(value));
        } catch (error: any) {
            console.error('Error setting cache value: ', error);
            throw error;
        }
    }

    async get(key: string): Promise<any> {
        try {
            const data = await this.redisClient.get(key);
            if (!data) return null;
            return JSON.parse(data)


        } catch (error: any) {
            console.error('Error getting cache value: ', error);
            throw error;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.redisClient.del(key);
            console.log(`🗑️ Deleted cache for key: ${key}`);
        } catch (error: any) {
            console.error('Error deleting cache value: ', error);
            throw error;
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            const result = await this.redisClient.exists(key);
            return result === 1;
        } catch (error: any) {
            console.error('Error checking cache key existence:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.redisClient.disconnect();
            console.log('🛑 Redis connection closed');
        } catch (error) {
            console.error('Error disconnecting from Redis:', error);
            throw error;
        }
    }
}

export default new RedisCache();
